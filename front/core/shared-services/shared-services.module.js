import { UploadService } from './upload-service/upload.service';
import { MessageSocketService } from './socket-service/message-socket-service/message-socket.service';
import { UserStorageService } from './user-storage/user-storage.service';
import { LoginUserStorageService } from './login-user-storage/login-user.storage.service';
import { QueryGeneratorService } from './query-generator-service/query-generator.service';

import ngFileUpload from 'ng-file-upload';


const sharedServicesModule = angular.module('app.core.sharedServices',['ngFileUpload'])
                                    .service('uploadService', UploadService)
                                    .service('MessageSocketService', MessageSocketService)
                                    .service('UserStorageService', UserStorageService)
                                    .service('LoginUserStorageService', LoginUserStorageService)
                                    .service('QueryGeneratorService', QueryGeneratorService)
                                    .name;

export { sharedServicesModule };