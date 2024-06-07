import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import DataTable, { columns } from '@/components/DataTable';
import {
  FormItemUnit,
  FormItemCircleDiameter,
  FormItemHoleDiameter,
} from '@/components/FormItems';

type TValues = {
  unit: 'mm' | 'inch';
  circleDiameter: string;
  holeDiameter: string;
};
type TResult = {
  name: string;
  value: string;
  unit: string;
};
const DEFAULT_VALUES: TValues = {
  unit: 'mm',
  circleDiameter: '',
  holeDiameter: '',
};
export default function EquivalentNumberOfHolesForm() {
  const [result, setResult] = React.useState<TResult[]>();
  const { t } = useTranslation();
  const formSchema = z.object({
    unit: z.enum(['mm', 'inch']),
    circleDiameter: z.string().min(1, { message: t('required') }),
    holeDiameter: z.string().min(1, { message: t('required') }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: DEFAULT_VALUES,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { unit, circleDiameter, holeDiameter } = values;

    const circleArea = Math.PI * (Number(circleDiameter) / 2) ** 2;
    const holeArea = Math.PI * (Number(holeDiameter) / 2) ** 2;
    const equivalentNumberOfHoles = circleArea / holeArea;

    setResult([
      {
        name: t('circleDiameter'),
        value: Number(circleDiameter).toFixed(2),
        unit,
      },
      {
        name: t('holeDiameter'),
        value: Number(holeDiameter).toFixed(2),
        unit,
      },
      {
        name: t('equivalentNoOfHoles'),
        value: Number(equivalentNumberOfHoles).toFixed(2),
        unit: t('unit.hole'),
      },
    ]);
  }

  function onClear() {
    form.reset(DEFAULT_VALUES);
    setResult(undefined);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormItemUnit control={form.control} t={t} />
          <FormItemCircleDiameter control={form.control} t={t} />
          <FormItemHoleDiameter control={form.control} t={t} />

          <div className='flex flex-col md:flex-row gap-4'>
            <Button type='submit' className='w-full'>
              {t('submit')}
            </Button>
            <Button
              type='button'
              variant='destructive'
              className='w-full'
              onClick={onClear}
            >
              {t('clear')}
            </Button>
          </div>
        </form>
      </Form>
      <Dialog onOpenChange={() => setResult(undefined)} open={!!result}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('result')}</DialogTitle>
            <DialogDescription>
              <DataTable columns={columns} data={result ?? []} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
