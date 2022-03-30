const plugin = {
  MyMessage: function (val) {
    if (window.unity.myMessage) {
      window.unity.myMessage(Pointer_stringify(val));
    }
  },
};

mergeInto(LibraryManager.library, plugin);
