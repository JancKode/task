import { expect } from 'chai';
import sinon from 'sinon';


import * as bcrypt from 'bcrypt';
import { LoginResolver } from '../../resolvers/UserResolver';
import { AppDataSource } from '../../data-source';

describe('LoginResolver', () => {
    let loginResolver: LoginResolver;
    let mockUser = {
        id: 'someUserId',
        userId: 'someUserId',
        username: 'testUser',
        password: 'hashedPassword'
    };

    beforeEach(() => {
        loginResolver = new LoginResolver();
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should throw error for nonexistent user', async () => {
        sinon.stub(AppDataSource, 'getRepository').returns({
            findOne: sinon.stub().resolves(undefined)
        } as any);

        try {
            await loginResolver.login('nonexistentUser', 'testPassword');
            expect.fail('Expected error was not thrown');
        } catch (err) {
            expect(err.message).to.equal('User not found');
        }
    });

});
