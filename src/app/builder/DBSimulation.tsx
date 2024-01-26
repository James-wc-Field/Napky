import { Project } from "./SchemaSimulation";

const simulatedDatabase:Project[] = [
  {
    id: 1,
    userId: 'user123',
    createdAt: new Date(),
    name: 'Sample project 1',
    description: 'Description for Sample project 1',
    content: '',
  },
  {
    id: 2,
    userId: 'user456',
    createdAt: new Date(),
    name: 'Sample project 2',
    description: 'Description for Sample project 2',
    content: '',
  },
  {
    id: 2,
    userId: 'user789',
    createdAt: new Date(),
    name: 'Sample project 3',
    description: 'Description for Sample project 3',
    content: '',
  }
];

export default simulatedDatabase;
