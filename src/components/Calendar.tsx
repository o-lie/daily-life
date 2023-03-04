import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import timeGridPlugin from "@fullcalendar/timegrid";
import plLocale from "@fullcalendar/core/locales/pl";
import { EventInput } from "@fullcalendar/core";

type Props = {
	events: EventInput[]
}

const Calendar = (props: Props) => {

	const {
		events
	} = props;

	return (
		<>
			<FullCalendar
				viewClassNames={ "calendar" }
				plugins={ [ timeGridPlugin ] }
				initialView="timeGridWeek"
				locale={ plLocale }
				// height={ "1000px" }
				nowIndicator
				// nowIndicatorClassNames={ "now-indicator" }
				events={ events }
			/>
		</>
	);
};

export default Calendar;