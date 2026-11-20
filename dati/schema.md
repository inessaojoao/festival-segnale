# Data schema

## Entities and fields

### Sede (Venue)

| Field | Type | Example |
|---|---|---|
| `id` | number | `1` |
| `nome` | string | `"Officina Nord"` |
| `indirizzo` | string | `"Indirizzo della sede"` |

Primary key: `id`. It is numeric, unique among venues, and stable.

### Evento (Event)

| Field | Type | Example |
|---|---|---|
| `id` | number | `1` |
| `nome` | string | `"Lettere in movimento"` |
| `descrizione` | string | `"Un incontro su tipografia, ritmo e comunicazione visiva."` |
| `immagine` | string | `"assets/lettere-in-movimento.svg"` |
| `immagine_alt` | string | `"Lettere geometriche disposte su una griglia"` |
| `data` | string | `"12 giugno"` |
| `orario` | string | `"10:00"` |
| `tipologia` | string | `"Incontro"` |
| `sede_id` | number | `1` |

Primary key: `id`. It is numeric, unique among events, and stable.

## Relationship

One venue can host multiple events. Each event takes place at one venue.
`Evento.sede_id` references `Sede.id`.

## Quantity

The data contains six events and three venues.

## Updates

The project maintainers update the data by editing the JSON files in the repository and publishing the changes.

## Page display

The Program page displays each event's name, description, image, date, time, and type, along with the venue where it takes place.
