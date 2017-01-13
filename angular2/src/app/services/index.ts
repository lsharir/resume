export * from './analytics.service';
export * from './index.service';
export * from './utilities.service';
export * from './reveal.service';

import { AnalyticsService } from './analytics.service';
import { IndexService } from './index.service';
import { UtilitiesService } from './utilities.service';
import { RevealService } from './reveal.service';

export const SERVICES = [
    AnalyticsService,
    IndexService,
    UtilitiesService,
    RevealService
];