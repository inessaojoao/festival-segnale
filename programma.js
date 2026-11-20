const statusMessage = document.querySelector("#event-status");
const eventGrid = document.querySelector("#event-grid");

function addTextElement(parent, tagName, className, text) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  element.textContent = text;
  parent.appendChild(element);
  return element;
}

function formatDate(dateString) {
  const date = new Date(`${dateString}T12:00:00`);
  return new Intl.DateTimeFormat("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long"
  }).format(date);
}

function renderEvent(event, venueName) {
  const card = document.createElement("article");
  card.className = "event-card";

  const image = document.createElement("img");
  image.src = event.immagine;
  image.alt = event.immagine_alt;
  card.appendChild(image);

  const body = document.createElement("div");
  body.className = "event-body";

  addTextElement(
    body,
    "p",
    "event-meta",
    `${formatDate(event.data)} · ${event.orario} · ${event.categoria}`
  );

  addTextElement(body, "h3", "", event.titolo);
  addTextElement(body, "p", "", event.descrizione);

  const venue = document.createElement("p");
  venue.className = "event-place";
  const label = document.createElement("strong");
  label.textContent = "Sede: ";
  venue.append(label, document.createTextNode(venueName));
  body.appendChild(venue);

  card.appendChild(body);
  eventGrid.appendChild(card);
}

async function loadEvents() {
  try {
    const [eventsResponse, venuesResponse] = await Promise.all([
      fetch("dati/eventi.json"),
      fetch("dati/sedi.json")
    ]);

    if (!eventsResponse.ok || !venuesResponse.ok) {
      throw new Error("Impossibile leggere i file dei dati.");
    }

    const [events, venues] = await Promise.all([
      eventsResponse.json(),
      venuesResponse.json()
    ]);

    if (!events.length) {
      statusMessage.textContent = "Al momento non ci sono eventi.";
      return;
    }

    const venuesById = new Map(venues.map(venue => [venue.id, venue]));

    for (const event of events) {
      const venue = venuesById.get(event.sede_id);
      renderEvent(event, venue ? venue.nome : "Sede da definire");
    }

    statusMessage.textContent = "";
  } catch (error) {
    statusMessage.textContent =
      "Non è stato possibile caricare il programma. Riprova più tardi.";
    console.error(error);
  }
}

loadEvents();