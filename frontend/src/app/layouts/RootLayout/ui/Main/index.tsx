import cn from 'clsx';
import { ComponentProps } from 'react';

export const Main = ({ className, children, ...props }: ComponentProps<'main'>) => {
    return (
        <main className={cn(className)} {...props}>
            {children}
        </main>
    );
};
