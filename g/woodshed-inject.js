(function () {
  var KEY = "polevaya-plan-v6";
  var woodshed = {
    id: "woodshed-82",
    kind: "shed",
    name: "Дровница",
    x: 28.8,
    y: 13.69,
    w: 8.2,
    h: 2.15,
    rot: 0
  };
  var house = {
    id: "house-330",
    kind: "existing-house",
    name: "Жилой дом",
    x: 28.8,
    y: 4.82,
    w: 12.07,
    h: 8.07,
    rot: 0,
    locked: true
  };
  function hasWoodshed(list) {
    return (list || []).some(function (o) {
      return o && (o.id === "woodshed-82" || o.name === "Дровница");
    });
  }
  try {
    var raw = localStorage.getItem(KEY);
    if (!raw) {
      localStorage.setItem(
        KEY,
        JSON.stringify({
          state: { objects: [house, woodshed], showGrid: true },
          version: 0
        })
      );
      return;
    }
    var data = JSON.parse(raw);
    var objs =
      data && data.state && Array.isArray(data.state.objects)
        ? data.state.objects
        : data && Array.isArray(data.objects)
          ? data.objects
          : null;
    if (!objs) {
      localStorage.setItem(
        KEY,
        JSON.stringify({
          state: { objects: [house, woodshed], showGrid: true },
          version: 0
        })
      );
      return;
    }
    if (!hasWoodshed(objs)) {
      objs.push(woodshed);
      if (data.state && Array.isArray(data.state.objects)) data.state.objects = objs;
      else data.objects = objs;
      localStorage.setItem(KEY, JSON.stringify(data));
    }
  } catch (e) {}
})();
