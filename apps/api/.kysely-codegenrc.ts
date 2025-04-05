/**
 * @type {import('kysely-codegen').Config}
 */
export default {
  camelCase: true,
  overrides: {
    columns: {
      "user.id": "Generated<string>",
    },
  },
};
