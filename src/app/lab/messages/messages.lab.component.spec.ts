import { MessageService } from 'src/app/services/message/message.service';
import { MessagesComponentForLab } from './messages.lab.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('2-message component integration testing:', () => {
  let component: MessagesComponentForLab;
  let messageService: jasmine.SpyObj<MessageService>;
  let fixture: ComponentFixture<MessagesComponentForLab>;

  beforeEach(() => {
    messageService = jasmine.createSpyObj(['messages', 'add', 'clear']);
    messageService.messages = [];
    messageService.add.and.callFake((msg) => {
      messageService.messages.push(msg);
    });
    messageService.clear.and.callFake(() => {
      messageService.messages = [];
    });
    TestBed.configureTestingModule({
      declarations: [MessagesComponentForLab],
      providers: [{ provide: MessageService, useValue: messageService }],
    });
    fixture = TestBed.createComponent(MessagesComponentForLab);
    component = fixture.componentInstance;
  });

  // 1) created
  it('expect comp. created successfully', () => {
    expect(component).toBeTruthy();
  });

  // 2) empty
  it('expect component template to be empty', () => {
    //Note: there is *ngIf="messageService.messages.length" in line 1 in template
    expect(fixture.debugElement.children.length).toBe(0);
  });

  // 3) message content && messages list
  it('then expect div.msg to have the messages after setting it', () => {
    messageService.add('First message');
    messageService.add('Second message');
    messageService.add('Third message');
    fixture.detectChanges();
    const firstMsg: HTMLDivElement = fixture.debugElement.query(
      By.css('.msg')
    ).nativeElement;
    const listMsg = fixture.debugElement.query(By.all());
    expect(firstMsg.textContent).toBe('First message');
    expect(listMsg.children.length - 1).toBe(3); // -1 to exclude the h2 element
  });
});
