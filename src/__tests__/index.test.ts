import fs from "fs";
import { updateFile } from "..";

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

const expectData = `apps:
  - name: node-backend
    version: v2.1.3
    repo: git@github.com:fastup-kit/node-backend.git
  - name: migration
    version: v1.0.0
    repo: git@github.com:fastup-kit/migration.git
  - name: reverse-proxy
    version: v1.0.0
    repo: git@github.com:fastup-kit/reverse-proxy.git
`;

const fileName = "./src/__tests__/test.file.yml";

test("should update version in test file", () => {
  fs.writeFileSync(fileName, baseData);

  updateFile(fileName, "node-backend", "v2.1.3");

  const resultData = fs.readFileSync(fileName, { encoding: "utf-8" });

  expect(resultData).toBe(expectData);
});

afterAll(() => {
  fs.rmSync(fileName);
})
