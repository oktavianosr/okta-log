import { validateStringArray } from '../../../../utils/validate-string-array';

function validate({ params }: { params: { data: Record<string, unknown> } }) {
  validateStringArray(params.data.technologies, 'technologies');
}

export default { beforeCreate: validate, beforeUpdate: validate };
