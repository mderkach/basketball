const calendar = {
  body: document.querySelector('.calendar-grid'),
  date: undefined,
  mode: undefined,
  data: [
    {
      month: false,
      day: 'Воскресенье',
      date: '26',
      info: [
        {
          time: '12:20',
          name: 'А б',
        },
      ],
      isWeekend: true,
    },
    {
      month: false,
      day: 'Понедельник',
      date: '27',
      info: false,
      modifiers: false,
    },
    {
      month: 'Июль',
      day: 'Вторник',
      date: '28',
      info: [
        {
          time: '12:26',
          name: 'ЦУЙ фыв',
        },
        {
          time: '19:30',
          name: 'фыв',
        },
      ],
    },
  ],
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

    console.log(cellBody);
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
    calendar.date = new Date();
  },
  init: () => {
    if (calendar.body) {
      calendar.getMonth();
      window.addEventListener('load', () => {
        calendar.setMode();
      });
      window.addEventListener('resize', () => {
        calendar.setMode();
      });

      calendar.renderCalendar(calendar.data);
    }
  },
};

export default calendar;
