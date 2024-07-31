import moment from 'moment';



export const formatItems = (itemsData) => {

  const formatted = {};
  itemsData.forEach((item) => {

    const date = moment(item.date).format('YYYY-MM-DD');
    if (!formatted[date]) {
      formatted[date] = [];
    }
    formatted[date].push({
      name: item.nameOfTask,
      email: item.email,
      time: moment(item.hour).format('HH:mm'),
      type: item.typeOf,
      categorie:item.categorieOf
    });
  });
  return formatted;
};

export const formatHolidays = (holidaysData) => {
  const formatted = {};
  holidaysData.forEach((holiday) => {
    const date = moment(holiday.date.iso).format('YYYY-MM-DD');
    if (!formatted[date]) {
      formatted[date] = [];
    }
    formatted[date].push({
      name: holiday.name,
      description: holiday.description,
      type: 'Holidays',
    });
  });
  return formatted;
};
import axios from 'axios';
import { API_URL, CALENDARIFIC_API_KEY, CALENDARIFIC_COUNTRY, CALENDARIFIC_YEAR } from '@env';

export const fetchItems = async (email) => {
  console.log(email)
  const response = await axios.get(`${API_URL}/api/alls/getByEmail/${email}`);
  
  return response.data;
};

export const fetchHolidays = async () => {
  const response = await axios.get(
    `https://calendarific.com/api/v2/holidays?api_key=izswbWEguTldJ6Hks31AYShuI6ZdYfSZ&country=tn&year=2024&language=fr`
  );
  // console.log(response.data.response.holidays,'holidays');
  return response.data.response.holidays;
};
