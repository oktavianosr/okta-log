import { createPublishedController } from '../../../utils/public-controller';
import { publicPopulates } from '../../../utils/public-query';

export default createPublishedController('api::project.project', publicPopulates.project);
