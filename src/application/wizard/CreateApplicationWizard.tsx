import React, { ReactNode } from 'react';
import { Component } from 'react';
import { CreateApplicationPage } from '../crud/CreateApplicationPage';
import { CreateVariantPage } from '../crud/CreateVariantPage';
import {
  Wizard,
  WizardContextConsumer,
  WizardStep,
} from '@patternfly/react-core';
import {
  PushApplication,
  AndroidVariant,
} from '@aerogear/unifiedpush-admin-client';
import { SetupPage } from './SetupPage';
import {
  ApplicationListContext,
  ContextInterface,
} from '../../context/Context';
import { SendTestNotificationPage } from './SendTestNotificationPage';
import { VariantItem } from '../ApplicationDetail/panels/VariantItem';
import { SetupSenderAPI } from './SetupSenderAPI';
import { WizardFinalPage } from './WizardFinalPage';

interface Props {
  open: boolean;
  close: () => void;
}

interface State {
  app?: PushApplication;
  stepIdReached: number;
}

export class CreateApplicationWizard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      stepIdReached: 1,
    };
  }

  render(): React.ReactNode {
    const context = this.context as ContextInterface;
    const { stepIdReached } = this.state;

    const moveNext = async (
      nextId: number,
      onNext: () => void,
      stateUpdate?: Partial<State>
    ) => {
      await this.setState({ ...stateUpdate, stepIdReached: nextId });
      onNext();
    };

    const createAppPage = (
      <WizardContextConsumer>
        {({ onNext }) => (
          <CreateApplicationPage
            onFinished={async application =>
              moveNext(2, onNext, { app: application })
            }
          />
        )}
      </WizardContextConsumer>
    );
    const createVariantPage = (
      <WizardContextConsumer>
        {({ onNext }) => (
          <CreateVariantPage
            app={this.state.app!}
            onFinished={() => moveNext(3, onNext)}
          />
        )}
      </WizardContextConsumer>
    );

    const setupPage = (
      <WizardContextConsumer>
        {({ onNext }) => (
          <SetupPage
            app={this.state.app!}
            variant={context.selectedVariant!}
            onFinished={onNext}
          />
        )}
      </WizardContextConsumer>
    );

    const sendTestNotificationPage = (
      <SendTestNotificationPage
        app={this.state.app!}
        variant={context.selectedVariant!}
      />
    );

    const setupSenderAPI = (
      <WizardContextConsumer>
        {({ onNext }) => (
          <SetupSenderAPI
            app={this.state.app!}
            variant={context.selectedVariant!}
            onFinished={onNext}
          />
        )}
      </WizardContextConsumer>
    );

    const finalPage = (
      <WizardContextConsumer>
        {({ onClose }) => <WizardFinalPage onClose={onClose} />}
      </WizardContextConsumer>
    );

    const steps = [
      {
        id: 1,
        name: 'Create your first Application',
        component: createAppPage,
        nextButtonText: 'Next',
      },
      {
        id: 2,
        name: 'Create Application Variant',
        component: createVariantPage,
        canJumpTo: stepIdReached >= 20,
        nextButtonText: 'Next',
      },
      {
        id: 3,
        name: 'Mobile device: Set up variant',
        component: setupPage,
        canJumpTo: stepIdReached >= 30,
        nextButtonText: 'Next',
      } as WizardStep,
      {
        id: 4,
        name: 'Test! Send notification',
        component: sendTestNotificationPage,
        canJumpTo: stepIdReached >= 40,
        nextButtonText: 'Next',
      } as WizardStep,
      {
        id: 5,
        name: 'Backend: Set up sender API',
        component: setupSenderAPI,
        nextButtonText: 'Next',
      },
      {
        id: 6,
        name: 'Well done!',
        component: finalPage,
      },
    ];

    if (this.props.open) {
      return (
        <Wizard
          isOpen={this.props.open}
          onClose={this.props.close}
          title="Create Application"
          description="This wizard will guide you through all the steps required to create an application an its variants"
          steps={steps}
          footer={<></>}
        />
      );
    }

    return null;
  }
}
CreateApplicationWizard.contextType = ApplicationListContext;
