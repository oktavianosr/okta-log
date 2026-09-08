import { validateStringArray } from '../../../../utils/validate-string-array';

function validate({ params }: { params: { data: Record<string, unknown> } }) {
  validateStringArray(params.data.skills, 'skills');
}

export default { beforeCreate: validate, beforeUpdate: validate };
