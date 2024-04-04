import { useDragDropEffect, useCursorEffect, useSelectionEffect } from '@/app/core/effects';
import { DragDropDriver, MouseClickDriver, MouseMoveDriver } from '@/app/core/drivers';

export const DEFAULT_EFFECTS = [useDragDropEffect, useCursorEffect, useSelectionEffect];

export const DEFAULT_DRIVERS = [DragDropDriver, MouseMoveDriver, MouseClickDriver];
