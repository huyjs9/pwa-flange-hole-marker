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
  FormItemPCD,
  FormItemAngle,
} from '@/components/FormItems';

type TValues = {
  unit: 'mm' | 'inch';
  pcd: string;
  angle: string;
};
type TResult = {
  name: string;
  value: string;
  unit: string;
};
const DEFAULT_VALUES: TValues = {
  unit: 'mm',
  pcd: '',
  angle: '',
};
export default function HolesAtAnyAngleForm() {
  const [result, setResult] = React.useState<TResult[]>();
  const { t } = useTranslation();
  const formSchema = z.object({
    unit: z.enum(['mm', 'inch']),
    pcd: z.string().min(1, { message: t('required') }),
    angle: z.string().min(1, { message: t('required') }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: DEFAULT_VALUES,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { unit, pcd, angle } = values;
    const holeDistance = Math.sqrt(
      ((Number(pcd) * Number(pcd)) / 2) *
        (1 - Math.cos((Number(angle) * Math.PI) / 180))
    ).toFixed(2);

    setResult([
      {
        name: t('pcd'),
        value: Number(pcd).toFixed(2),
        unit,
      },
      {
        name: t('angle'),
        value: Number(angle).toFixed(2),
        unit: t('unit.degree'),
      },
      {
        name: t('holeDistance'),
        value: Number(holeDistance).toFixed(2),
        unit,
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
          <FormItemPCD control={form.control} t={t} />
          <FormItemAngle control={form.control} t={t} />

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
