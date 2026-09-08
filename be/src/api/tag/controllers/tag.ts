import { createPublishedController } from '../../../utils/public-controller';
import { publicPopulates } from '../../../utils/public-query';

export default createPublishedController('api::tag.tag', publicPopulates.tag, false);
