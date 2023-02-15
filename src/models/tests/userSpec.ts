import { user, User } from '../user';

const store = new user();

describe('User Model', () => {
  describe('Check that methods exist', () => {
    it('should have an index method', () => {
      expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
      expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
      expect(store.create).toBeDefined();
    });

    it('should have a update method', () => {
      expect(store.update).toBeDefined();
    });

    it('should have a delete method', () => {
      expect(store.destroy).toBeDefined();
    });
  });

  describe('Test model methods', () => {
    let user_id: string, password: string;
    it('create method should add a new user', async () => {
      const result = await store.create({
        fname: 'Test',
        lname: 'test',
        password: 'test1',
      });
      expect(result).toEqual({
        id: result.id,
        fname: 'Test',
        lname: 'test',
        password: result.password,
      });

      user_id = result.id as unknown as string;
      password = result.password;
    });

    it('index method should return a length of users', async () => {
      const result = await store.index();
      expect(result.length).toEqual(1);
    });

    it('show method should return the correct user', async () => {
      const result = await store.show(user_id);
      expect(result).toEqual({
        id: user_id,
        fname: 'Test',
        lname: 'test',
        password: password,
      });
    });

    it('authenticate method should authenticate a user', async () => {
      const currentUser: User = {
        fname: 'Test',
        lname: 'test',
        password: 'test1',
      };
      const result = await store.authenticate(
        currentUser.fname,
        currentUser.lname,
        currentUser.password
      );
      expect(result).toEqual({
        id: user_id,
        fname: currentUser.fname,
        lname: currentUser.lname,
        password: password,
      });
    });

    it('update method should update a user', async () => {
      const updatedUser: User = {
        id: user_id,
        fname: 'Test1',
        lname: 'test1',
        password: password,
      };
      const result = await store.update(updatedUser);
      expect(result).toEqual({
        id: updatedUser.id,
        fname: updatedUser.fname,
        lname: updatedUser.lname,
        password: password,
      });
    });

    it('delete method should remove the user', async () => {
      const result = await store.destroy(user_id);
      expect(result.id).toEqual(user_id);
    });
  });
});
