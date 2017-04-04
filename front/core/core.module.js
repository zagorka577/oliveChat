import { filterModule } from './filters/filter.module';
import { uiModule } from './ui/ui.module';
import { repositoryModule } from './repository/repository.module';
import { sharedServicesModule } from './shared-services/shared-services.module';
import { oliValidators } from './validators/oli-validators.directive';

const coreModule = angular.module('app.core', [ filterModule,
                                                uiModule,
                                                repositoryModule,
                                                sharedServicesModule,
                                              ])
    .directive('oliValidators', oliValidators)
    .name;

export { coreModule };
