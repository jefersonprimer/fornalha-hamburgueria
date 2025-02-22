import React from 'react';
import SectionsMenu from './components/SectionsMenu';
import PedidosPage from './pedidos/page';
import Banner from './components/banner';

const App: React.FC = () => {
  return (
      <div>
        <Banner/>
        
          <SectionsMenu />
          <PedidosPage />
     
      </div>
  );
};

export default App;
