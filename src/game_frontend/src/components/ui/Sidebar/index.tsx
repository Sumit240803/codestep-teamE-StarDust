import './index.css';
import SidebarTab from './Tab';

const SIDEBAR_ITEMS = [
    {
        icon : '/assets/images/coin.svg',
        title : 'Exchange',
    },
    {
        icon : '/assets/images/article.svg',
        title : 'Mine Cards'
    },
    {
      icon : '/assets/images/console.svg',
      title : 'Games'
  },
    {
        icon : '/assets/images/ufo.svg',
        title : 'Airdrop'
    },
    {
        icon : '/assets/images/users.svg',
        title : 'Friends'
    },
    {
        icon : '/assets/images/gift.svg',
        title : 'Gifts'
    }
]

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-children" aria-orientation="horizontal">
        {SIDEBAR_ITEMS.map((item, idx) => (
          <SidebarTab key={idx} {...item} />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
