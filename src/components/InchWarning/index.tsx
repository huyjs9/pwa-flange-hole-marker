import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { FileWarning } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import FractionToDecimalConversionChart from '@/assets/fraction-to-decimal-conversion-chart.jpeg';

export default function InchWarning() {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();

  return (
    <>
      <Alert>
        <FileWarning className='h-4 w-4' />
        <AlertTitle>{t('inchWarning.title')}</AlertTitle>
        <AlertDescription className='mt-5'>
          {t('inchWarning.text')}{' '}
          <Button
            type='button'
            variant='link'
            className='p-0 whitespace-normal text-left'
            onClick={() => setOpen(true)}
          >
            {t('inchWarning.link')}
          </Button>
        </AlertDescription>
      </Alert>
      <Dialog onOpenChange={() => setOpen(false)} open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('fractionToDecimalConversionChart')}</DialogTitle>
          </DialogHeader>
          <div className='w-full min-h-[475px]'>
            <img
              src={FractionToDecimalConversionChart}
              alt='fraction chart'
              loading='lazy'
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
