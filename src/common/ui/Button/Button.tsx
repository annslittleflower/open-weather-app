import { ComponentPropsWithoutRef } from 'react';
import cn from '@/common/utils/classnames';

type ButtonProps = ComponentPropsWithoutRef<'button'>;

const Button = ({
  children,
  className,
  type = 'button',
  ...rest
}: ButtonProps) => (
  <button
    className={cn('p-2 border-2 border-black', className)}
    type={type || 'button'}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...rest}
  >
    {children}
  </button>
);

export default Button;
