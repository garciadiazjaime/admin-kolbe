import AppHandler from '../../components/AppHandler';
import LocationListSection from '../../components/sections/location/list';


export default {
  items: {
    component: AppHandler,
    default: LocationListSection,
    children: [{
      title: 'Plantel',
      url: '/location',
      component: LocationListSection,
    }],
  },
};
