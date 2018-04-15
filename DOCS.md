Components
----------

**src/App.js**

### 1. App




-----
**src/components/EventAttachments/AttachmentItem.js**

### 1. AttachmentItem




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
attachment|shape|yes||
deleteAttachment|func|yes||
-----
**src/components/EventAttachments/index.js**

### 1. EventAttachments




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
event|shape|yes||
attachments|array|yes||
deleteAttachment|func|yes||
getAttachments|func|yes||
-----
**src/components/EventMap/Map.js**

### 1. MapContainer




-----
**src/components/EventMap/index.js**

### 1. EventMap




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
lat|number|yes||
lng|number|yes||
-----
**src/components/EventsCalendar/index.js**

### 1. EventsCalendar




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
events|arrayOf|yes||
-----
**src/components/EventsList/EventsListItem.js**

### 1. EventsListItem




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
Id|string|no||
Title|string|no||
Description|string|no||
Location|string|no||
EventDateTime|string|no||
CreationTimeStamp|number|no||
synced|bool|no||
loading|bool|no||
error|object|no||
-----
**src/components/EventsList/index.js**

### 1. EventsList




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
events|array|no||
-----
**src/components/EventsTimeline/index.js**

### 1. EventsTimeline




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
events|array|no||
-----
**src/components/HighlightedText.js**

### 1. HighlightedText




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
children|string|yes||
matches|arrayOf|yes||
-----
**src/components/Navigation.js**

### 1. Navigation




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
actionsLeft|arrayOf|no|&lt;See the source code&gt;|
actionsRight|arrayOf|no|&lt;See the source code&gt;|
-----
**src/components/Pagination.js**

### 1. Pagination




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
page|number|yes||
pages|number|yes||
onPageChange|func|yes||
-----
**src/components/TimelineSearch.js**

### 1. TimelineSearchInput




-----
**src/components/TimelinesList/TimelineListItem.js**

### 1. TimelineListItem




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
Id|string|yes||
Title|string|yes||
CreationTimeStamp|string|yes||
synced|bool|no||
loading|bool|no||
error|object|no||
-----
**src/components/TimelinesList/index.js**

### 1. TimelinesList




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
timelines|array|yes||
-----
**src/components/TimelinesSearchList/TimelineItem.js**

### 1. TimelineItem




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
searchResult|shape|yes||
-----
**src/components/TimelinesSearchList/index.js**

### 1. TimelinesSearchList




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
timelines|array|no||
timelinesFilter|string|no||
-----
**src/components/inputs/DatetimeInput.js**

### 1. DatetimeInput




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
label|string|no||
value|string|no|null|
defaultValue|string|no||
autoFocus|bool|no||
onChange|func|no||
-----
**src/components/inputs/EditableLocation.js**

### 1. EditableLocation




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
value||no|&lt;See the source code&gt;|
-----
**src/components/inputs/EditableText.js**

### 1. EditableText




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
defaultValue|string|no||
onChange|func|yes||
-----
**src/components/inputs/EditableTextArea.js**

### 1. EditableTextArea




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
value||no|&lt;See the source code&gt;|
-----
**src/components/inputs/Input.js**

### 1. Input




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
label|string|no||
placeholder|string|no||
defaultValue|any|no||
value|any|no|null|
onChange|func|no||
iconLeft|string|no||
iconRight|string|no||
autoFocus|bool|no||
type|string|no|&lt;See the source code&gt;|
className|string|no|&lt;See the source code&gt;|
-----
**src/components/inputs/LocationInput.js**

### 1. LocationInput




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
label|string|no||
value|string|no||
onChange|func|yes||
-----
**src/components/inputs/Textarea.js**

### 1. Textarea




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
className||no|&lt;See the source code&gt;|
type||no|&lt;See the source code&gt;|
value||no|null|
-----
**src/components/modals/CreateAttachmentModal.js**

### 1. CreateAttachmentModal




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
createAttachment|func|yes||
onClose|func|yes||
-----
**src/components/modals/CreateEventModal.js**

### 1. CreateEventModal




-----
**src/components/modals/CreateTimelineModal.js**

### 1. CreateTimelineModal




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
onClose|func|yes||
createTimeline|func|yes||
-----
**src/components/modals/LinkEventModal.js**

### 1. LinkEventModal




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
events|arrayOf|yes||
linkEvent|func|yes||
onClose|func|yes||
-----
**src/components/modals/ModalsParent.js**

### 1. ModalsParent




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
modalOpened|string|no||
modalProps|object|no||
onModalClose|func|no||
-----
**src/components/nav-items/CreateTimelineButton.js**

### 1. CreateTimelineButton




-----
**src/components/option-buttons/EventOptionsButton/index.js**

### 1. EventOptionsButton




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
event|shape|yes||
openModal|func|yes||
deleteEvent|func|yes||
-----
**src/components/option-buttons/TimelineOptionsButton/index.js**

### 1. TimelineOptionsButton




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
createEvent|func|yes||
deleteTimeline|func|yes||
-----
**src/pages/EventPage/EventBox.js**

### 1. EventBox




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
event|shape|yes||
handleTitleChange|func|yes||
handleDescriptionChange|func|yes||
handleLocationChange|func|yes||
-----
**src/pages/EventPage/LinkedEventsMap.js**

### 1. LinkedEventsMap




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
items|arrayOf|yes||
getLinkedEvents|func|yes||
unlinkEvent|func|yes||
-----
**src/pages/EventPage/index.js**

### 1. EventPage




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
event|shape|no||
changeEventTitle|func|yes||
changeEventDescription|func|yes||
changeEventLocation|func|yes||
deleteEvent|func|yes||
-----
**src/pages/HomePage.js**

### 1. HomePage




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
timelines|arrayOf|yes||
hasFiltersApplied|bool|yes||
fetchAll|func|yes||
-----
**src/pages/TimelinePage/TimelineEvents.js**

### 1. TimelineEvents




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
timeline|shape|yes||
-----
**src/pages/TimelinePage/TimelineHeading.js**

### 1. TimelineHeading




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
timeline|shape|yes||
onTitleChange|func|yes||
-----
**src/pages/TimelinePage/index.js**

### 1. TimelinePage




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
timeline|shape|no||
changeTimelineTitle|func|yes||
deleteTimeline|func|yes||
fetchEvents|func|yes||
createEvent|func|yes||
-----

<sub>This document was generated by the <a href="https://github.com/marborkowski/react-doc-generator" target="_blank">**React DOC Generator v1.2.5**</a>.</sub>
