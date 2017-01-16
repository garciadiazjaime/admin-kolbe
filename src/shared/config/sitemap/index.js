import AppHandler from '../../components/AppHandler';
import HomeSection from '../../components/sections/home';


export default {
  items: {
    component: AppHandler,
    default: HomeSection,
    children: [{
      title: 'Inicio',
      url: '/inicio',
      component: HomeSection,
    }],
  },
};
