## Practical 6: Demonstrate ListView with Item Click
**Objective:** To implement a scrollable list where clicking an item displays a `Toast` message.

### 1. Layout (`activity_main.xml`)
```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="16dp">
    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Select a Programming Language:"
        android:textSize="18sp"
        android:textStyle="bold"
        android:layout_marginBottom="10dp"/>
    <ListView
        android:id="@+id/myListView"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:divider="#CCCCCC"
        android:dividerHeight="1dp" />
</LinearLayout>
```

### 2. Java Logic (`MainActivity.java`)
```java
public class MainActivity extends AppCompatActivity {
    ListView listView;
    String[] languages = {"Java", "Kotlin", "Python", "JavaScript", "C++", "Dart", "Swift", "PHP", "Ruby", "Go"};

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        listView = findViewById(R.id.myListView);
        // Simple adapter to bind data to the list
        ArrayAdapter<String> adapter = new ArrayAdapter<>(this, 
            android.R.layout.simple_list_item_1, languages);
        listView.setAdapter(adapter);
        // Handling Item Clicks
        listView.setOnItemClickListener((parent, view, position, id) -> {
            String selectedItem = languages[position];
            Toast.makeText(MainActivity.this, "Selected: " + selectedItem, Toast.LENGTH_SHORT).show();
        });
    }
}
```