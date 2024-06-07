import { useTranslation } from 'react-i18next';

import { ChevronLeft } from 'lucide-react';
import i18n from '@/i18n';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Toggle } from '@/components/ui/toggle';
import EquivalentNoOfHolesDimensions from '@/assets/equivalent-no-of-holes-dimensions.png';
import FlangeHolesMarkingDimensions from '@/assets/flange-holes-marking-dimensions.png';
import EquispacedHolesForm from '@/components/EquispacedHolesForm';
import HolesAtAnyAngleForm from '@/components/HolesAtAnyAngleForm';
import EquivalentNumberOfHolesForm from '@/components/EquivalentNumberOfHolesForm';

function App() {
  const { t } = useTranslation();

  const resources = [
    {
      id: 'equispacedHoles',
      name: t('equispacedHoles'),
      image: FlangeHolesMarkingDimensions,
      form: <EquispacedHolesForm />,
    },
    {
      id: 'holesAtAnyAngle',
      name: t('holesAtAnyAngle'),
      image: FlangeHolesMarkingDimensions,
      form: <HolesAtAnyAngleForm />,
    },
    {
      id: 'equivalentNoOfHoles',
      name: t('equivalentNoOfHoles'),
      image: EquivalentNoOfHolesDimensions,
      form: <EquivalentNumberOfHolesForm />,
    },
  ];

  const handleChangeLanguage = (pressed: boolean) => {
    const lng = pressed ? 'en' : 'vi';
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
  };

  return (
    <div className='max-w-screen-lg lg:mx-auto mx-6 mb-6'>
      <nav className='py-4 text-2xl font-semibold w-full flex justify-between'>
        {t('title')}
        <Toggle
          pressed={i18n.resolvedLanguage === 'en'}
          onPressedChange={handleChangeLanguage}
        >
          {i18n.resolvedLanguage}
        </Toggle>
      </nav>
      <div className='flex flex-col md:flex-row gap-6'>
        {resources.map((resource) => (
          <Drawer key={resource.id}>
            <DrawerTrigger asChild>
              <Card className='hover:bg-gray-100 hover:cursor-pointer transition-colors'>
                <CardContent>
                  <div className='flex justify-center mt-6 rounded-lg border'>
                    <img
                      className='rounded-lg w-[300px]'
                      src={resource.image}
                      alt={resource.name}
                    />
                  </div>
                </CardContent>
                <CardFooter className='justify-center'>
                  <p className='text-lg text-center'>{resource.name}</p>
                </CardFooter>
              </Card>
            </DrawerTrigger>

            <DrawerContent className='max-w-screen-lg mx-auto h-full outline-none'>
              <div className='pl-2 py-4'>
                <DrawerClose asChild>
                  <Button variant='link' className='pl-0'>
                    <ChevronLeft className='h-8 w-8' />
                    <div className='text-lg'>{resource.name}</div>
                  </Button>
                </DrawerClose>
              </div>
              <div className='mx-auto w-full overflow-auto'>
                <DrawerHeader className='pt-0'>
                  <DrawerDescription>
                    <div className='flex justify-center rounded-lg border'>
                      <img
                        className='rounded-lg w-[300px]'
                        src={resource.image}
                        alt={resource.name}
                      />
                    </div>
                  </DrawerDescription>
                </DrawerHeader>
                <div className='p-4 pb-0'>{resource.form}</div>
              </div>
            </DrawerContent>
          </Drawer>
        ))}
      </div>
    </div>
  );
}

export default App;
