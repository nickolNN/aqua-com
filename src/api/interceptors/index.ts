// The live mock layer delegates to ./mocks (tasks persisted in localStorage
// + the /auth endpoints).
export {
  setMockMode,
  isMockMode,
  mockBaseQuery,
  interceptMockRequest,
  interceptTasksMockRequest,
} from './mocks';
