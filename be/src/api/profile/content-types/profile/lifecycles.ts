import { validateStringArray } from '../../../../utils/validate-string-array';

function validate({ params }: { params: { data: Record<string, unknown> } }) {
  if (params.data.skills !== undefined) {
    params.data.skills = validateStringArray(params.data.skills, 'skills');
  }
}

export default { beforeCreate: validate, beforeUpdate: validate };
