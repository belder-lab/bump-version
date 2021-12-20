import { bumpVersion } from "../bumpVersion";

const baseData = `---
apps:
  - name: node-backend
    version: v1.0.0
    repo: git@github.com:fastup-kit/node-backend.git
  - name: migration
    version: v1.0.0
    repo: git@github.com:fastup-kit/migration.git
  - name: reverse-proxy
    version: v1.0.0
    repo: git@github.com:fastup-kit/reverse-proxy.git`;

const expected = `apps:
  - name: node-backend
    version: v2.0.0
    repo: git@github.com:fastup-kit/node-backend.git
  - name: migration
    version: v1.0.0
    repo: git@github.com:fastup-kit/migration.git
  - name: reverse-proxy
    version: v1.0.0
    repo: git@github.com:fastup-kit/reverse-proxy.git
`;

test('should work', () => {
  expect(bumpVersion('node-backend', 'v2.0.0', baseData)).toBe(expected);
});