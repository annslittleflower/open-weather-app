import { ComponentPropsWithoutRef } from 'react';
import cn from '@/common/utils/classnames';

type InputProps = ComponentPropsWithoutRef<'input'>;

const Input = ({ className, ...rest }: InputProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <input className={cn('p-4  border-2 border-black', className)} {...rest} />
);

export default Input;
