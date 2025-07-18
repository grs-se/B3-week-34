import { GreetingComponent } from './greeting.component';

describe('GreetingComponent', () => {
  let component: GreetingComponent;

  beforeEach(() => {
    component = new GreetingComponent();
  });

  it('should show the correct greeting', () => {
    component.name = 'Alice';
    expect(component.greet()).toBe('Hello, Alice!');
  });

  it('should greet with empty name if none provided', () => {
    component.name = '';
    expect(component.greet()).toBe('Hello, !');
  });
});