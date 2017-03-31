/**
 * Created on 3/26/16.
 */
export default function (schema, opts) {

  schema.methods.obj = function (options) {
    let obj = this.toObject();
    delete obj._id;
    delete obj.__v;
    delete obj.password;
    if (options) {
      if (Array.isArray(options.stringify)) {

        for (let field of options.stringify) {
          if (obj[field]) {
            obj[field] = obj[field].toString() || '';
          } else {
            obj[field] = '';
          }
        }
      }

      if (Array.isArray(options.delete)) {
        for (let field of options.delete) {
          delete obj[field];
        }
      }
    }
    obj = date_to_string(obj);
    return obj;
  }
};

function date_to_string(source) {

  if (!source) { return source }

  if (typeof source.toUTCString === 'function') {

    return source.toString();
  }

  if (isDateType(source.created_at)) {
    source.created_at = source.created_at.toISOString();
  }

  if (isDateType(source.updated_at)) {
    source.updated_at = source.updated_at.toISOString();
  }

  if (isDateType(source.anno_updated_at)) {
    source.anno_updated_at = source.anno_updated_at.toISOString();
  }

  if (isDateType(source.sort_time)) {
    source.sort_time = source.sort_time.toISOString();
  }

  if (isDateType(source.birthday)) {
    source.birthday = source.birthday.toISOString();
  }

  if (isDateType(source.birthday)) {
    source.birthday = source.birthday.toISOString();
  }

  if (isDateType(source.finished_at)) {
    source.finished_at = source.finished_at.toISOString();
  }

  if (isDateType(source.begun_at)) {
    source.begun_at = source.begun_at.toISOString();
  }
  return source;
}

function isDateType(data) {
  return !!(data && typeof data.toUTCString === 'function');
}
