import { useState } from 'react';

export function useTogglingElements(isATree) {
  const [toggledProperties, setToggledProperties] = useState([]);
  const [treeToggledProperties, setTreeToggledProperties] = useState([]);

  function getChildrenRecursive(element, tree) {
    const children = treeToggledProperties.filter(e => e.parent === element.toogleProperty);
    const childValues = children.flatMap(child => getChildrenRecursive(child, tree));
    return [...children.map(c => c.toogleProperty), ...childValues];
  }

  function onToggleElement(element) {
    const isElementToggled = toggledProperties.includes(element.toogleProperty);

    if (isElementToggled) {
      const childrens = isATree ? getChildrenRecursive(element, treeToggledProperties) : [];
      const toggledPropertiesToClose = [...childrens, element.toogleProperty];

      setToggledProperties(prevToggledProperties =>
        prevToggledProperties.filter(tp => !toggledPropertiesToClose.includes(tp))
      );
    } else {
      setTreeToggledProperties(prevTreeToggledProperties =>
        isATree ? [...prevTreeToggledProperties, element] : prevTreeToggledProperties
      );

      setToggledProperties(prevToggledProperties => [...prevToggledProperties, element.toogleProperty]);
    }
  }

  const isToggled = row => {
    if (row.parent) {
      return (
        toggledProperties?.some(tp => tp === row.toogleProperty) && toggledProperties?.some(tp => tp === row.parent)
      );
    }
    return toggledProperties?.some(tp => tp === row.toogleProperty);
  };

  const isVisible = row => {
    if (row.isAccordionHeader && !row.parent) return true;
    if (row.isAccordionHeader && row.parent) return toggledProperties?.some(tp => tp === row.parent);
    if (row.parents) return row.parents.every(parent => toggledProperties.some(tp => tp === parent));
    return toggledProperties?.some(tp => tp === row.parent);
  };

  return {
    onToggleElement,
    isToggled,
    isVisible
  };
}
