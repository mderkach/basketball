import axios from 'axios';

const URI = 'http://localhost:4000';

const calendar = {
  body: document.querySelector('.calendar-grid'),
  date: undefined,
  month: undefined,
  year: undefined,
  mode: undefined,
  monthData: undefined,
  filterData: (obj) => {
    const filteredData = Object.entries(obj);
    const currentMonth = calendar.getLocalizedMonthName(calendar.month);
    filteredData.forEach((item) => {
      const monthName = item[0];
      const monthData = item[1];
      if (currentMonth === monthName) {
        monthData.days[0].month = `${currentMonth} ${monthData.year}`;
        console.log(monthData.days.length);
        calendar.renderCalendar(monthData.days);
      }
    });
  },
  getLocalizedMonthName: (name) => {
    const objDate = new Date();
    objDate.setMonth(name);

    const locale = 'ru';
    const month = objDate.toLocaleString(locale, { month: 'long' });
    return month;
  },
  fetchData: () => {
    axios.get(`${URI}/data`).then((res) => {
      calendar.filterData(res.data);
    });
  },
  renderCell: (cell) => {
    const cellBody = document.createElement('div');
    cellBody.className = 'cards-calendar';

    const cellInfo = document.createElement('div');
    cellInfo.className = 'cards-calendar__info';

    const header = document.createElement('div');
    header.className = 'cards-calendar__header';

    if (cell.month) {
      const monthElement = document.createElement('p');
      monthElement.className = 'cards-calendar-month';
      monthElement.innerText = cell.month;
      header.appendChild(monthElement);
    }

    if (cell.day) {
      const dayElement = document.createElement('p');
      dayElement.className = 'cards-calendar-day';
      dayElement.innerText = cell.day;
      header.appendChild(dayElement);
    }

    if (cell.date) {
      const dateElement = document.createElement('p');
      const dateElementBig = document.createElement('p');
      dateElement.className = 'cards-calendar-date';
      dateElementBig.className = 'cards-calendar-date-big';
      dateElement.innerText = cell.date;
      dateElementBig.innerText = cell.date;

      header.appendChild(dateElement);
      header.appendChild(dateElementBig);
    }

    if (cell.info) {
      cellBody.classList.add('has-info');
      cell.info.forEach((item, index) => {
        if (index <= 1) {
          const time = document.createElement('p');
          const name = document.createElement('p');
          time.className = 'cards-calendar__info-time';
          name.className = 'cards-calendar__info-name';

          time.innerText = item.time;
          name.innerText = item.name;

          cellInfo.appendChild(time);
          cellInfo.appendChild(name);
        }
      });
    }

    if (cell.isWeekend) {
      cellBody.classList.add('is-weekend');
    }

    cellBody.appendChild(header);
    cellBody.appendChild(cellInfo);
    return cellBody;
  },
  renderCalendar: (array) => {
    array.forEach((item) => {
      calendar.body.append(calendar.renderCell(item));
    });
  },
  setMode: () => {
    const mobile = window.matchMedia('(min-width: 0px) and (max-width: 767px)');
    const tablet = window.matchMedia('(min-width: 768px) and (max-width: 1199px)');
    const desktop = window.matchMedia('(min-width: 1200px)');

    if (mobile.matches) {
      calendar.mode = 'mobile';
    } else if (tablet.matches) {
      calendar.mode = 'tablet';
    } else if (desktop.matches) {
      calendar.mode = 'desktop';
    }
  },
  getMonth: () => {
    const date = new Date();
    calendar.date = date.getDate();
    calendar.month = date.getMonth();
    calendar.year = date.getFullYear();
  },
  init: () => {
    if (calendar.body) {
      calendar.getMonth();
      calendar.fetchData();
      window.addEventListener('load', () => {
        calendar.setMode();
      });
      window.addEventListener('resize', () => {
        calendar.setMode();
      });
    }
  },
};

export default calendar;
