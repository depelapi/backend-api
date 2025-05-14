import { Model, ModelStatic } from 'sequelize';

export interface ModelWithAssociations extends ModelStatic<Model> {
  associate?: (models: any) => void;
}