import { TFunction } from 'i18next';
import { Control } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import InchWarning from '@/components/InchWarning';

type TFormItem = {
  control: Control<any, any>;
  t: TFunction;
};

function FormItemUnit({ control, t }: TFormItem) {
  return (
    <FormField
      control={control}
      name='unit'
      render={({ field }) => (
        <FormItem className='space-y-3'>
          <FormLabel>{t('unit.title')}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className='flex flex-col space-y-1'
            >
              <FormItem className='flex items-center space-x-3 space-y-0'>
                <FormControl>
                  <RadioGroupItem value='mm' />
                </FormControl>
                <FormLabel className='font-normal'>{t('unit.mm')}</FormLabel>
              </FormItem>
              <FormItem className='flex items-center space-x-3 space-y-0'>
                <FormControl>
                  <RadioGroupItem value='inch' />
                </FormControl>
                <FormLabel className='font-normal'>{t('unit.inch')}</FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          {field.value === 'inch' && <InchWarning />}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function FormItemPCD({ control, t }: TFormItem) {
  return (
    <FormField
      control={control}
      name='pcd'
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('pcd')}</FormLabel>
          <FormControl>
            <Input placeholder={t('pcd')} type='number' {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function FormItemN({ control, t }: TFormItem) {
  return (
    <FormField
      control={control}
      name='n'
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('n')}</FormLabel>
          <FormControl>
            <Input placeholder={t('n')} type='number' {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function FormItemAngle({ control, t }: TFormItem) {
  return (
    <FormField
      control={control}
      name='angle'
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('angle')}</FormLabel>
          <FormControl>
            <Input placeholder={t('angle')} type='number' {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function FormItemCircleDiameter({ control, t }: TFormItem) {
  return (
    <FormField
      control={control}
      name='circleDiameter'
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('circleDiameter')}</FormLabel>
          <FormControl>
            <Input placeholder={t('circleDiameter')} type='number' {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function FormItemHoleDiameter({ control, t }: TFormItem) {
  return (
    <FormField
      control={control}
      name='holeDiameter'
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('holeDiameter')}</FormLabel>
          <FormControl>
            <Input placeholder={t('holeDiameter')} type='number' {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export {
  FormItemUnit,
  FormItemPCD,
  FormItemN,
  FormItemAngle,
  FormItemCircleDiameter,
  FormItemHoleDiameter,
};
