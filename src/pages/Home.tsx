import { IonContent, IonItem, IonLabel, IonList, IonLoading, IonPage, IonText, IonThumbnail } from '@ionic/react';
import { useQuery } from '@tanstack/react-query';
import './Home.css';

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];

  creationAt: string;
  updatedAt: string;

  category: {
    id: number;
    name: string;
    image: string;
  }
}

const Home: React.FC = () => {
  const { data, isFetching } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetch('https://api.escuelajs.co/api/v1/products');
      return response.json() as Promise<Product[]>;
    }
  })

  const sanitizeImage = (image: string) => {
    return image.replace(/["]/g, '').replace(/[\[|\]]/g, '');
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        {
          isFetching && (
            <IonLoading
              isOpen={isFetching}
              message="Cargando productos..."
            />
          )
        }

        {
          data && (
            <IonList>
              {
                data.map(product => (
                  <IonItem key={product.id} className='product-card'>
                    <IonThumbnail slot="start">
                      <img src={sanitizeImage(product.images[0])} alt="Product Image" />
                    </IonThumbnail>
                    <IonLabel className='product-card-label'>
                      <h2>{product.title}</h2>
                      <p>{product.description}</p>
                      <p className='product-card-price'>
                        <IonText color="primary">${product.price.toFixed(2)}</IonText>
                      </p>
                    </IonLabel>
                  </IonItem>
                ))
              }
            </IonList>
          )
        }
      </IonContent>
    </IonPage>
  );
};

export default Home;
