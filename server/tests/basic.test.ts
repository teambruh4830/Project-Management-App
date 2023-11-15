// test.ts
describe('Basic Test', () => {
    beforeAll(() => {
        console.log('Starting basic test...');
    });

    afterAll(() => {
        console.log('Basic test completed.');
    });

    test('Simple Test', () => {
        console.log('Running simple test...');
        expect(1 + 1).toBe(2);
    });
});
