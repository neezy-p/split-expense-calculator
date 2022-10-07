import { Card } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { SplitField } from '../SplitField/SplitField';

import './styles.scss';

export const Splits = (props) => {
  // Placeholder variable for testing
  const totalAmountLeftToSplit = 0;
  let totalLeftModifier = '';

  if (totalAmountLeftToSplit > 0) {
    totalLeftModifier = 'splits__total-left--warning';
  }

  if (totalAmountLeftToSplit < 0) {
    totalLeftModifier = 'splits__total-left--danger';
  }

  const handleRemoveFor = (id) => () => {
    props.onRemoveSplit(id);
  };

  if (!props.splits.length) {
    return (
      <div className="splits">
        <span className="splits__no-splits">
          There are no splits. Add a split to start!
        </span>
      </div>
    );
  }

  return (
    <div className="splits">
      <TransitionGroup className="splits__form">
        {props.splits.map((split, index) => (
          <CSSTransition
            key={split.id}
            nodeRef={split.nodeRef}
            timeout={500}
            classNames="splits__split"
          >
            <SplitField
              ref={split.nodeRef}
              value={split.value}
              position={index + 1}
              splitType={props.selectedSplitType}
              onRemove={handleRemoveFor(split.id)}
              totalExpense={props.totalExpense}
              splits={props.splits}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
      <div className="splits__summary">
        <label className="splits__total-label">Total</label>
        <Card className="splits__total-amount">$0</Card>
        <div className={`splits__total-left ${totalLeftModifier}`}>
          {totalAmountLeftToSplit >= 0 && `$${totalAmountLeftToSplit} left`}

          {totalAmountLeftToSplit < 0 &&
            `-$${Math.abs(totalAmountLeftToSplit)} over`}
        </div>
      </div>
    </div>
  );
};
