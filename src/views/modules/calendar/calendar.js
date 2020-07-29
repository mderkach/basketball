const calendar = {
  body: document.querySelector('.calendar-grid'),
  btnNext: document.querySelector('.calendar__heading-controls-next'),
  btnPrev: document.querySelector('.calendar__heading-controls-prev'),
  monthsNames: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ],
  daysNames: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
  dataLength: {
    desktop: 40,
    tablet: 12,
    mobile: 9,
  },
  currentDate: undefined,
  currentMonth: undefined,
  currentYear: undefined,
  periodFrom: undefined,
  periodTo: undefined,
  mode: undefined,
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
  renderCell: (month, day, date, info, isWeekend) => {
    const cellBody = document.createElement('div');
    cellBody.className = 'cards-calendar';

    const cellInfo = document.createElement('div');
    cellInfo.className = 'cards-calendar__info';

    const header = document.createElement('div');
    header.className = 'cards-calendar__header';

    if (month) {
      const monthElement = document.createElement('p');
      monthElement.className = 'cards-calendar-month';
      monthElement.innerText = month;
      header.appendChild(monthElement);
    }

    if (day) {
      const dayElement = document.createElement('p');
      dayElement.className = 'cards-calendar-day';
      dayElement.innerText = day;
      header.appendChild(dayElement);
    }

    if (date) {
      const dateElement = document.createElement('p');
      const dateElementBig = document.createElement('p');
      dateElement.className = 'cards-calendar-date';
      dateElementBig.className = 'cards-calendar-date-big';
      dateElement.innerText = date;
      dateElementBig.innerText = date;

      header.appendChild(dateElement);
      header.appendChild(dateElementBig);
    }

    if (info) {
      cellBody.classList.add('has-info');
      info.forEach((item, index) => {
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

    if (isWeekend) {
      cellBody.classList.add('is-weekend');
    }

    cellBody.appendChild(header);
    cellBody.appendChild(cellInfo);
    return cellBody;
  },
  generateCell: (dateObj, day) => {
    let dayCard = '';
    const localizedDay = calendar.daysNames[day];
    const localizedDate = () => {
      let mnth = '';
      calendar.monthsNames.forEach((item, index) => {
        if (index === dateObj.getMonth()) {
          mnth = item;
        }
      });

      return mnth;
    };
    const title = `${localizedDate()} ${dateObj.getFullYear()}`;
    const date = dateObj.getDate();
    if (
      localizedDay === calendar.daysNames[calendar.daysNames.length - 1] ||
      localizedDay === calendar.daysNames[calendar.daysNames.length - 2]
    ) {
      dayCard = calendar.renderCell(title, localizedDay, date, false, true);
    } else {
      dayCard = calendar.renderCell(title, localizedDay, date);
    }

    return dayCard;
  },
  getMonth: () => {
    const date = new Date();
    calendar.currentDate = date.getDate();
    calendar.currentMonth = date.getMonth();
    calendar.currentYear = date.getFullYear();
  },
  getLastDayInLayout: () => {
    const string = calendar.body.lastChild.querySelector('.cards-calendar-month').innerText;
    const arr = string.split(' ');
    const day = calendar.body.lastChild.querySelector('.cards-calendar-date').innerText;
    const monthIndex = () => {
      let num = 0;
      calendar.monthsNames.forEach((month, index) => {
        if (month === arr[0]) {
          num = index;
        }
      });
      return num;
    };
    calendar.periodTo = new Date(arr[1], monthIndex(), day);
  },
  generateLayout: (month, year) => {
    const result = [];
    let counter = 0;
    let curDate;
    if (!calendar.periodFrom) {
      curDate = new Date(year, month, 1, 0, 0, 0, 0);
      calendar.periodFrom = curDate;
    } else {
      curDate = calendar.periodFrom;
    }
    const startDatOffset = curDate.getDay() * -1 + 2;

    for (let week = 0; week < 6; week += 1) {
      for (let day = 0; day < 7; day += 1) {
        const d = new Date(year, month, counter + startDatOffset, 0, 0, 0, 0);
        if (d.getMonth() === month) {
          result.push(calendar.generateCell(d, day));
        } else {
          result.push(calendar.generateCell(d, day));
        }
        counter += 1;
      }
    }
    result.splice(result.length - 2, 2);
    return result;
  },
  renderCalendar: (array) => {
    array.forEach((item) => {
      calendar.body.append(item);
    });
    calendar.getLastDayInLayout();
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

      calendar.renderCalendar(calendar.generateLayout(calendar.currentMonth, calendar.currentYear));

      calendar.btnNext.addEventListener('click', (e) => {
        e.preventDefault();
        calendar.body.querySelectorAll('div').forEach((item) => {
          item.remove();
        });

        calendar.renderCalendar(
          calendar.generateLayout(calendar.currentMonth + 1, calendar.currentYear),
        );
      });
      calendar.btnPrev.addEventListener('click', (e) => {
        e.preventDefault();
        calendar.body.querySelectorAll('div').forEach((item) => {
          item.remove();
        });
        calendar.renderCalendar(
          calendar.generateLayout(calendar.currentMonth - 1, calendar.currentYear),
        );
      });

      console.log(calendar);
    }
  },
};

export default calendar;
