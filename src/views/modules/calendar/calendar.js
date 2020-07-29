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
  periodText: document.querySelector('.calendar__heading-info'),
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
  renderPeriod: (from, to) => {
    const text = `${from.getDate()} ${calendar.monthsNames[from.getMonth()]} - ${to.getDate()} ${
      calendar.monthsNames[to.getMonth()]
    } ${to.getFullYear()} г.`;
    calendar.periodText.innerText = text;
  },
  getMonth: () => {
    const date = new Date();
    calendar.currentDate = date.getDate();
    calendar.currentMonth = date.getMonth();
    calendar.currentYear = date.getFullYear();
  },
  getLastDayInLayout: () => {
    if (calendar.body.lastChild) {
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
    }
  },
  getFirstDayInLayout: () => {
    if (calendar.body.firstChild) {
      const string = calendar.body.firstChild.querySelector('.cards-calendar-month').innerText;
      const arr = string.split(' ');
      const day = calendar.body.firstChild.querySelector('.cards-calendar-date').innerText;
      const monthIndex = () => {
        let num = 0;
        calendar.monthsNames.forEach((month, index) => {
          if (month === arr[0]) {
            num = index;
          }
        });
        return num;
      };
      calendar.periodFrom = new Date(arr[1], monthIndex(), day);
    }
  },
  generateLayout: (month, year) => {
    const result = [];
    let counter = 0;
    const curDate = new Date(year, month, 1, 0, 0, 0, 0);
    const startDatOffset = curDate.getDay() * -1 + 2;

    for (let week = 0; week < 6; week += 1) {
      for (let day = 0; day < 7; day += 1) {
        const d = new Date(year, month, counter + startDatOffset, 0, 0, 0, 0);
        if (d.getMonth() === month) {
          result.push(calendar.generateCell(d, day));
        }
        counter += 1;
      }
    }
    return result;
  },
  generateMobileLayout: (mode, date, month, year) => {
    const result = [];
    let counter = 0;
    let layoutLength = 0;

    if (mode === 'tablet') {
      layoutLength = calendar.dataLength.tablet;
    }

    if (mode === 'mobile') {
      layoutLength = calendar.dataLength.mobile;
    }

    for (let length = 0; length < layoutLength; length += 1) {
      const d = new Date(year, month, counter + date, 0, 0, 0, 0);
      let dayIndex = d.getDay() - 1;
      if (dayIndex < 0) {
        dayIndex = 6;
      }
      result.push(calendar.generateCell(d, dayIndex));
      counter += 1;
    }
    return result;
  },
  clearLayout: (clndr) => {
    if (clndr.querySelectorAll('div')) {
      clndr.querySelectorAll('div').forEach((item) => {
        item.remove();
      });
    }
  },
  renderCalendar: (array) => {
    array.forEach((item) => {
      calendar.body.append(item);
    });
    calendar.getFirstDayInLayout();
    calendar.getLastDayInLayout();
  },
  renderLayout: (month, year, day) => {
    if (calendar.mode === 'desktop') {
      calendar.renderCalendar(calendar.generateLayout(month, year));
    } else {
      calendar.renderCalendar(calendar.generateMobileLayout(calendar.mode, day, month, year));
    }

    calendar.renderPeriod(calendar.periodFrom, calendar.periodTo);
  },
  switchNext: () => {
    if (calendar.mode === 'desktop') {
      let currentMonth = calendar.periodTo.getMonth();
      let currentYear = calendar.periodTo.getFullYear();

      if (currentMonth === 11) {
        currentYear += 1;
        currentMonth = -1;
      }

      calendar.renderLayout(currentMonth + 1, currentYear, calendar.periodTo.getDate());
    } else {
      const currentMonth = calendar.periodTo.getMonth();
      const currentYear = calendar.periodTo.getFullYear();
      const currentDate = calendar.periodTo.getDate() + 1;
      calendar.renderLayout(currentMonth, currentYear, currentDate);
    }
  },
  switchPrev: () => {
    if (calendar.mode === 'desktop') {
      let currentMonth = calendar.periodTo.getMonth();
      let currentYear = calendar.periodTo.getFullYear();

      if (currentMonth === 0) {
        currentYear -= 1;
        currentMonth = 12;
      }

      calendar.renderLayout(currentMonth - 1, currentYear, calendar.periodTo.getDate());
    } else {
      const currentMonth = calendar.periodTo.getMonth();
      const currentYear = calendar.periodTo.getFullYear();
      const currentDate = calendar.periodTo.getDate() - 1;
      calendar.renderLayout(currentMonth, currentYear, currentDate);
    }
  },
  init: () => {
    if (calendar.body) {
      calendar.clearLayout(calendar.body);
      calendar.setMode();
      calendar.getMonth();

      window.addEventListener('load', () => {
        calendar.setMode();
      });

      window.addEventListener('resize', () => {
        calendar.clearLayout(calendar.body);
        calendar.setMode();
        calendar.renderLayout(
          calendar.periodFrom.getMonth(),
          calendar.periodFrom.getFullYear(),
          calendar.periodFrom.getDate(),
        );
      });

      calendar.renderLayout(calendar.currentMonth, calendar.currentYear, calendar.currentDate);

      calendar.btnNext.addEventListener('click', (e) => {
        e.preventDefault();
        calendar.body.querySelectorAll('div').forEach((item) => {
          item.remove();
        });

        calendar.switchNext();
      });

      calendar.btnPrev.addEventListener('click', (e) => {
        e.preventDefault();

        calendar.body.querySelectorAll('div').forEach((item) => {
          item.remove();
        });

        calendar.switchPrev();
      });
    }
  },
};

export default calendar;
