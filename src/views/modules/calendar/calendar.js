import axios from 'axios';

let BASE_URI;

if (process.env.NODE_ENV === 'production') {
  BASE_URI = '/api/calendar/';
} else {
  BASE_URI = 'http://localhost:4000';
}

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
  renderCell: (month, day, date, isWeekend) => {
    const cellBody = document.createElement('div');
    cellBody.className = 'cards-calendar';
    cellBody.setAttribute('data-day', day);
    cellBody.setAttribute('data-date', date);
    cellBody.setAttribute('data-month', month);

    const cellInfo = document.createElement('div');
    cellInfo.className = 'cards-calendar__info';
    cellInfo.setAttribute('data-info', '');
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

    if (isWeekend) {
      cellBody.classList.add('is-weekend');
    }

    cellBody.appendChild(header);
    cellBody.appendChild(cellInfo);
    return cellBody;
  },
  generateCell: (dateObj, day) => {
    let dayCard;
    const localizedDay = calendar.daysNames[day];
    const localizedDate = () => {
      let mnth;
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
      dayCard = calendar.renderCell(title, localizedDay, date, true);
    } else {
      dayCard = calendar.renderCell(title, localizedDay, date);
    }

    return dayCard;
  },
  renderPeriod: (from, to) => {
    const monthsNames = [
      'Января',
      'Февраля',
      'Марта',
      'Апреля',
      'Мая',
      'Июня',
      'Июля',
      'Августа',
      'Сентября',
      'Октября',
      'Ноября',
      'Декабря',
    ];
    const text = `${from.getDate()} ${monthsNames[from.getMonth()]} - ${to.getDate()} ${
      monthsNames[to.getMonth()]
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
      const string = calendar.body.lastChild.getAttribute('data-month');
      const arr = string.split(' ');
      const day = calendar.body.lastChild.getAttribute('data-date');
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
      const string = calendar.body.firstChild.getAttribute('data-month');
      const arr = string.split(' ');
      const day = calendar.body.firstChild.getAttribute('data-date');
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
    if (clndr.querySelectorAll('.cards-calendar')) {
      clndr.querySelectorAll('.cards-calendar').forEach((item) => {
        item.remove();
      });
    }
  },
  renderCalendar: (array) => {
    array.forEach((item, index) => {
      if (index !== 0 && parseInt(item.getAttribute('data-date'), 10) !== 1) {
        item.querySelector('.cards-calendar-month').remove();
      }
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
    let offset = 0;
    if (calendar.mode === 'tablet') {
      offset = calendar.dataLength.tablet;
    }

    if (calendar.mode === 'mobile') {
      offset = calendar.dataLength.mobile;
    }

    if (calendar.mode === 'desktop') {
      let currentMonth = calendar.periodTo.getMonth();
      let currentYear = calendar.periodTo.getFullYear();

      if (currentMonth === 0) {
        currentYear -= 1;
        currentMonth = 12;
      }

      calendar.renderLayout(currentMonth - 1, currentYear, calendar.periodTo.getDate());
    } else {
      let currentMonth = calendar.periodFrom.getMonth();
      let currentYear = calendar.periodFrom.getFullYear();
      const currentDate = new Date(calendar.periodFrom).getDate() - offset;

      if (currentMonth === 0) {
        currentYear -= 1;
        currentMonth = 12;
      }

      calendar.renderLayout(currentMonth, currentYear, currentDate);
    }
  },
  fetchData: (from, to) => {
    axios
      .get(`${BASE_URI}/data/`, {
        params: {
          filter: {
            location: window.location.href,
            date_from: from,
            date_to: to,
          },
        },
      })
      .then((res) => {
        Object.entries(res.data).forEach((item, index) => {
          if (index === 1) {
            calendar.responseDays = item[index];
          } else {
            calendar.responseYear = item[index + 1];
          }
        });
        calendar.applyResponse();
      })
      .catch((e) => {
        console.log(e);
      });
  },
  responseDays: undefined,
  responseYear: undefined,
  applyResponse: () => {
    calendar.responseDays.forEach((item) => {
      calendar.body
        .querySelectorAll(`[data-month="${item.month} ${calendar.responseYear}"]`)
        .forEach((target) => {
          if (parseInt(target.getAttribute('data-date'), 10) === item.date) {
            const cellBody = target.querySelector('[data-info]');
            target.classList.add('has-info');
            target.classList.add(`training-${item.type}`);

            item.info.forEach((guest, index) => {
              if (index !== 3) {
                const time = document.createElement('p');
                const name = document.createElement('a');
                name.setAttribute('href', guest.href);
                name.setAttribute('name', guest.href);
                name.setAttribute('onclick', `window.location.href='${guest.href}'`);
                time.className = 'cards-calendar__info-time';
                name.className = 'cards-calendar__info-name';

                time.innerText = guest.time;
                name.innerText = guest.name;

                cellBody.appendChild(time);
                cellBody.appendChild(name);
              }
            });
          }
        });
    });
  },
  setActive: () => {
    const rendered = calendar.body.querySelectorAll('.cards-calendar');
    rendered.forEach((item) => {
      if (calendar.mode === 'tablet' || calendar.mode === 'mobile') {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          rendered.forEach((card) => card.classList.remove('is-active'));
          if (!item.classList.contains('is-active')) {
            item.classList.add('is-active');
          }
        });
      }
    });
  },
  onResize: () => {
    calendar.clearLayout(calendar.body);
    calendar.setMode();
    calendar.renderLayout(
      calendar.periodFrom.getMonth(),
      calendar.periodFrom.getFullYear(),
      calendar.periodFrom.getDate(),
    );
    calendar.setActive();
    calendar.fetchData(calendar.periodFrom, calendar.periodTo);
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
        calendar.onResize();
      });

      calendar.renderLayout(calendar.currentMonth, calendar.currentYear, calendar.currentDate);
      calendar.setActive();
      calendar.fetchData(calendar.periodFrom, calendar.periodTo);

      calendar.btnNext.addEventListener('click', (e) => {
        e.preventDefault();
        calendar.body.querySelectorAll('div').forEach((item) => {
          item.remove();
        });

        calendar.switchNext();
        calendar.fetchData(calendar.periodFrom, calendar.periodTo);
      });

      calendar.btnPrev.addEventListener('click', (e) => {
        e.preventDefault();

        calendar.body.querySelectorAll('div').forEach((item) => {
          item.remove();
        });

        calendar.switchPrev();
        calendar.fetchData(calendar.periodFrom, calendar.periodTo);
      });
    }
  },
};

export default calendar;
