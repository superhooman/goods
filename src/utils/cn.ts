import clsx from 'clsx';

import type { ClassValue as ClassValueBase } from 'clsx';

export type ClassValue = ClassValueBase;

export const cn = (...values: ClassValue[]) => clsx(...values);
