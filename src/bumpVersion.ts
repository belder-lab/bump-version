
import yaml from 'js-yaml';

type PlainData = {
  apps: {
    name: string;
    version: string;
    repo: string;
  }[]
}

export function bumpVersion(name: string, version: string, yamlData: string) {
  const plainData = yaml.load(yamlData) as PlainData;

  for (let i = 0; i < plainData.apps.length; i++) {
      if (plainData.apps[i].name === name) {
          plainData.apps[i].version = version;
          break;
      }
  }

  return yaml.dump(plainData);
}
