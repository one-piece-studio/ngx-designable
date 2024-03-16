import { useDragDropEffect, useCursorEffect } from '@/app/core/effects';
import { DragDropDriver, MouseMoveDriver } from '@/app/core/drivers';

export const DEFAULT_EFFECTS = [useDragDropEffect, useCursorEffect];

export const DEFAULT_DRIVERS = [DragDropDriver, MouseMoveDriver];
