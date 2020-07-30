import api from '../src/Utils/apiHandler';

jest.mock('../src/Utils/apiHandler');

it('returns the user of the first user', async () => {
  api.getScore.mockResolvedValue({
    result: [
      {
        user: 'John Doe',
        score: 42,
      },
      {
        user: 'Peter Parker',
        score: 35,
      },
      {
        user: 'Wonder Woman',
        score: 50,
      },
    ],
  });
  const user = await api.getScore();
  expect(user.result[0].user).toEqual('John Doe');
});

it('returns the score and of the first user', async () => {
  api.getScore.mockResolvedValue({
    result: [
      {
        user: 'John Doe',
        score: 42,
      },
      {
        user: 'Peter Parker',
        score: 35,
      },
      {
        user: 'Wonder Woman',
        score: 50,
      },
    ],
  });

  const user = await api.getScore();
  expect(user.result[0].score).toEqual(42);
});

it('returns the confirmation for successful POST', async () => {
  api.setScore.mockResolvedValue({
    result: 'Leaderboard score created correctly.',
  });

  const result = await api.setScore('AAA', 23);
  expect(result.result).toEqual('Leaderboard score created correctly.');
});
